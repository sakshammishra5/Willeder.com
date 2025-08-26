// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input
function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000); // Limit length and trim whitespace
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'すべての必須項目を入力してください。' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Email validation
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください。' },
        { status: 400 }
      );
    }

    // Check required environment variables
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM', 'MAIL_TO'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars);
      return NextResponse.json(
        { error: 'サーバーの設定エラーです。管理者にお問い合わせください。' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!),
      secure: parseInt(process.env.SMTP_PORT!) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP configuration error:', verifyError);
      return NextResponse.json(
        { error: 'メールサーバーとの接続に失敗しました。管理者にお問い合わせください。' },
        { status: 500 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.MAIL_FROM, // Your SMTP email (fixed)
      to: process.env.MAIL_TO, // Your business email (fixed)
      replyTo: sanitizedEmail, // User's email (changes each time)
      subject: `お問い合わせ: ${sanitizedName}様から`,
      text: `
お問い合わせフォームから新しいメッセージが届きました。

【送信者情報】
名前: ${sanitizedName}
メールアドレス: ${sanitizedEmail}
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}

【お問い合わせ内容】
${sanitizedMessage}

---
このメールはお問い合わせフォームから自動送信されました。
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>お問い合わせ</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
      お問い合わせフォーム
    </h2>
    
    <p>お問い合わせフォームから新しいメッセージが届きました。</p>
    
    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #1e40af; margin-top: 0;">送信者情報</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 120px;">名前:</td>
          <td style="padding: 8px 0;">${sanitizedName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">メール:</td>
          <td style="padding: 8px 0;">${sanitizedEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">送信日時:</td>
          <td style="padding: 8px 0;">${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</td>
        </tr>
      </table>
    </div>
    
    <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #1e40af; margin-top: 0;">お問い合わせ内容</h3>
      <div style="white-space: pre-wrap; font-family: Arial, sans-serif;">${sanitizedMessage}</div>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
    <p style="color: #64748b; font-size: 12px; text-align: center;">
      このメールはお問い合わせフォームから自動送信されました。
    </p>
  </div>
</body>
</html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'お問い合わせを送信いたしました。2営業日以内にご返信いたします。' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Don't expose internal error details to users
    return NextResponse.json(
      { error: '送信に失敗しました。しばらく時間をおいてから再度お試しください。' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}