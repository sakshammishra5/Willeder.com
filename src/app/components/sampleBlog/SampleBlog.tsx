"use client";
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogCard } from '../blog/BlogCard';
import { useRouter } from 'next/navigation';
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content: string;
}


interface BlogCardProps extends BlogPost {
    onClick?: () => void;
}

interface SampleBlogProps {
    onBlogClick?: (slug: string) => void;
    //   onViewAllClick?: () => void;
}

export const SampleBlog: React.FC<SampleBlogProps> = ({
    onBlogClick = (slug: string) => console.log(`Navigate to blog: ${slug}`)
    //   onViewAllClick = () => console.log('View all blogs')
}) => {
    // Sample blog data matching the design
    const router = useRouter();
    
 onBlogClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  }

  const blogPosts: BlogPost[] = [
    {
            "id": 1,
            "slug": "figma-web-design-fundamentals",
            "title": "Figmaで始めるWebデザインの基礎：効率的なワークフローを構築する方法",
            "createdAt": "2024-12-15T09:00:00Z",
            "tags": ["Design", "Figma", "Web Design", "UI/UX"],
            "thumbnail": "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=800&h=450&fit=crop",
            "content": "<h2>Figmaがもたらすデザインワークフローの革新</h2><p>現代のWebデザインにおいて、Figmaは単なるデザインツールを超えた存在となっています。チーム全体でのコラボレーションを可能にし、デザインシステムの構築から開発者との連携まで、一貫したワークフローを提供します。</p><img src=\"https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop\" alt=\"Figmaインターフェース\" /><h2>効率的なコンポーネント設計のベストプラクティス</h2><p>Figmaでのコンポーネント作成において最も重要なのは、再利用性と拡張性を念頭に置いた設計です。バリエーション機能を活用することで、ボタンの状態管理やテーマカラーの切り替えが簡単になります。プロパティパネルを適切に設定することで、デザイナーと開発者の間のコミュニケーションコストを大幅に削減できます。</p><p>また、Auto Layoutを効果的に使用することで、レスポンシブデザインの基礎を Figma 上で構築できます。これにより、実装フェーズでの手戻りを最小限に抑えることができるのです。</p>"
        },
        {
            "id": 2,
            "slug": "ui-ux-business-impact-analysis",
            "title": "UI/UXがビジネスに与える実際のインパクト：データで見る改善効果",
            "createdAt": "2024-12-10T14:30:00Z",
            "tags": ["UI/UX", "Business", "Analytics", "Conversion"],
            "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
            "content": "<h2>UI/UX改善がコンバージョン率に与える具体的効果</h2><p>近年の調査によると、優れたUI/UXデザインは平均して20-25%のコンバージョン率向上をもたらします。特にEコマースサイトにおいて、チェックアウトプロセスの簡略化だけで売上が15%向上したケースもあります。</p><img src=\"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop\" alt=\"ユーザーエクスペリエンス分析\" /><h2>ユーザビリティテストで明らかになった改善ポイント</h2><p>実際のユーザビリティテストを通じて、多くの企業が見落としがちな問題点が浮き彫りになります。例えば、モバイルでのタップ領域の最適化により、操作完了率が30%向上した事例があります。また、情報アーキテクチャの見直しにより、ユーザーの目標達成時間を平均40秒短縮できました。</p><p>これらの改善は、単純なデザインの美しさではなく、ユーザーの行動パターンと心理的な負荷を理解した上での戦略的なアプローチの結果です。データドリブンなデザイン改善こそが、持続可能なビジネス成長を支える基盤となるのです。</p>"
        },
        {
            "id": 3,
            "slug": "cloud-architecture-modern-web-systems",
            "title": "クラウドネイティブなWebシステム構築：AWS、Azure、GCPの比較検討",
            "createdAt": "2024-12-08T11:15:00Z",
            "tags": ["Cloud", "AWS", "Azure", "GCP", "Architecture"],
            "thumbnail": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
            "content": "<h2>3大クラウドプロバイダーの特徴と選択基準</h2><p>現代のWebシステム開発において、適切なクラウドプロバイダーの選択は成功の鍵を握ります。AWS、Azure、GCPそれぞれが持つ独自の強みを理解し、プロジェクトの要件に最適な選択を行うことが重要です。</p><img src=\"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop\" alt=\"クラウドインフラストラクチャ\" /><h2>コスト効率と拡張性のバランス</h2><p>AWSは豊富なサービスラインナップと成熟したエコシステムが魅力ですが、コストの複雑さが課題となる場合があります。一方、Azureは既存のMicrosoft環境との親和性が高く、企業システムとの統合がスムーズです。GCPはGoogleの技術力を活かした機械学習サービスとビッグデータ処理に強みを持ちます。</p><p>実際の運用では、マルチクラウド戦略を採用する企業も増えており、各プロバイダーの得意分野を組み合わせることで、最適なパフォーマンスとコスト効率を実現しています。重要なのは、長期的な視点でのTCO（総所有コスト）を考慮した意思決定です。</p>"
        }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">ブログ</h2>
          <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-2"></div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">BLOG</p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              {...post}
              onClick={() => onBlogClick(post.slug)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            // onClick={onViewAllClick}
            className="group inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            もっと見る
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

