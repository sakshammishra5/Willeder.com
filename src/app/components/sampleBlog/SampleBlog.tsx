"use client";
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogCard } from '../blog/BlogCard';
import { useRouter } from 'next/navigation';
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  thumbnail: string;
  content: {
    h1Title: string;
    h2Sections: Array<{
      title: string;
      content: string;
      images?: string[];
      diagramData?: boolean;
    }>;
    h3Sections: Array<{
      title: string;
      content: string;
      isInitialDesign?: boolean;
    }>;
    bodyText: string;
    conclusionTitle: string;
    conclusionText: string;
  };
  createdAt: string;
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
    "slug": "responsive-design-mobile-first",
    "title": "モバイルファーストで始めるレスポンシブデザイン完全ガイド",
    "createdAt": "2023.07.15",
    "tags": ["Design", "Engineering"],
    "thumbnail": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    "content": {
      "h1Title": "モバイルファースト設計で\n成功するWebサイトを作る方法",
      "h2Sections": [
        {
          "title": "なぜモバイルファーストが重要なのか",
          "content": "現代のWebトラフィックの60%以上がモバイルデバイスからアクセスされています。モバイルファースト設計は、小さな画面から始めて段階的に大きな画面に対応していく手法で、パフォーマンスと使いやすさを両立できます。この手法により、コンテンツの優先順位が明確になり、本当に必要な要素だけを残したミニマルなデザインが実現できます。",
          "images": ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=500&fit=crop"]
        },
        {
          "title": "構造化データとセマンティックマークアップ",
          "content": "検索エンジンがWebサイトのコンテンツを正確に理解するため、JSON-LD形式による構造化データの実装が重要です。パンくずリスト、記事、商品、組織情報など、コンテンツタイプに応じた適切なSchema.orgマークアップを実装します。また、セマンティックHTMLによる文書構造の最適化により、検索エンジンクローラーの理解を促進し、リッチスニペットの表示機会を増やします。",
          "images": [],
          "diagramData": true
        },
        {
          "title": "クロール最適化とサイトマップ戦略",
          "content": "検索エンジンクローラーが効率的にサイトを巡回できるよう、内部リンク構造の最適化、robots.txtの適切な設定、XMLサイトマップの生成と管理を行います。重要なページへのクロールバジェットを適切に配分し、不要なページのインデックスを防ぐことで、検索エンジンからの評価を向上させます。また、ページネーションやAJAXコンテンツの適切な処理についても解説します。",
          "images": []
        }
      ],
      "h3Sections": [
        {
          "title": "モニタリングと継続的改善",
          "content": "Google Search Console、Google Analytics、各種SEOツールを活用した継続的な監視体制を構築し、データドリブンなSEO最適化を実現します。",
          "isInitialDesign": true
        }
      ],
      "bodyText": "テクニカルSEOは、コンテンツSEOと並んで検索順位向上に不可欠な要素です。検索エンジンがWebサイトを正確に理解し、ユーザーに適切に表示するための技術的最適化手法を実践的に学びましょう。",
      "conclusionTitle": "まとめ",
      "conclusionText": "テクニカルSEOの実装により、優れたコンテンツを検索エンジンに正しく評価してもらうことができます。継続的な監視と改善により、持続的な検索順位向上とオーガニックトラフィックの増加を実現できます。"
    }
  },
  {
    "id": 9,
    "slug": "design-system-component-library",
    "title": "デザインシステム構築でチーム開発を効率化する方法",
    "createdAt": "2023.09.15",
    "tags": ["Design", "Engineering"],
    "thumbnail": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    "content": {
      "h1Title": "統一されたデザインシステムで\nチームの生産性を向上させる",
      "h2Sections": [
        {
          "title": "デザイントークンによる一貫性の確保",
          "content": "デザインシステムの基盤となるデザイントークンは、色、タイポグラフィ、スペーシング、アニメーションなどの基本的なデザイン要素を標準化します。これらのトークンをJSON形式で管理し、デザインツールと開発環境の両方で同期することで、一貫性のあるブランド表現を実現します。Figma、Sketch、Adobe XDなどのデザインツールから、React、Vue、Angularなどの開発フレームワークまで、ツール間の連携方法を詳しく解説します。",
          "images": ["https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=500&fit=crop"]
        },
        {
          "title": "コンポーネントライブラリの設計と実装",
          "content": "再利用可能なUIコンポーネントは、開発効率とデザイン品質の向上に直結します。Atomic Designの原則に基づき、Atoms、Molecules、Organisms、Templates、Pagesの階層でコンポーネントを整理します。各コンポーネントには、バリエーション、状態、プロパティを明確に定義し、Storybookなどのツールを使用したドキュメント化により、チーム全体での理解と活用を促進します。",
          "images": [],
          "diagramData": true
        },
        {
          "title": "ガバナンスと継続的な運用",
          "content": "デザインシステムの成功には、適切なガバナンス体制と継続的な改善プロセスが不可欠です。コンポーネントの追加・変更プロセス、品質基準、レビュー体制を確立し、システムの一貫性を保ちながら進化させます。また、使用状況の監視、フィードバック収集、定期的な見直しにより、実際の開発ニーズに適応したシステムを維持します。",
          "images": []
        }
      ],
      "h3Sections": [
        {
          "title": "ツールチェーンの構築",
          "content": "デザインシステムの効率的な運用には、デザイン、開発、テスト、デプロイメントを支援する適切なツールチェーンの構築が重要です。",
          "isInitialDesign": true
        }
      ],
      "bodyText": "デザインシステムは、大規模なプロダクト開発において一貫性と効率性を両立する重要な基盤です。デザイナーと開発者が協力し、スケーラブルで保守性の高いデザインシステムを構築・運用する方法を体系的に学びましょう。",
      "conclusionTitle": "まとめ",
      "conclusionText": "効果的なデザインシステムの構築により、チーム全体の生産性向上と品質の一貫性を実現できます。継続的な改善と適切なガバナンスにより、組織の成長に合わせて進化するデザインシステムを構築できます。"
    }
  },
  {
    "id": 10,
    "slug": "api-design-restful-best-practices",
    "title": "RESTful API設計のベストプラクティスと実装ガイド",
    "createdAt": "2023.09.22",
    "tags": ["Engineering", "It Consulting"],
    "thumbnail": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
    "content": {
      "h1Title": "スケーラブルで保守性の高い\nAPI設計の実現方法",
      "h2Sections": [
        {
          "title": "RESTアーキテクチャの原則と実装",
          "content": "RESTful APIの設計には、統一インターフェース、ステートレス、キャッシュ可能性、階層システムなどの基本原則の理解が重要です。適切なHTTPメソッドの使用、リソース指向のURL設計、ステータスコードの適切な返却により、直感的で一貫性のあるAPIを構築します。また、HATEOASによるハイパーメディア制約の実装についても、実用的な観点から解説します。",
          "images": ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop"]
        },
        {
          "title": "認証・認可とセキュリティ対策",
          "content": "API のセキュリティは、現代のWebアプリケーションにおいて最重要事項の一つです。JWT による認証、OAuth 2.0 による認可、CORS の適切な設定、Rate Limiting による悪用防止など、多層的なセキュリティ対策を実装します。また、HTTPS の強制、入力値検証、SQLインジェクション対策など、基本的なセキュリティ原則についても詳しく解説します。",
          "images": [],
          "diagramData": true
        },
        {
          "title": "バージョニングとドキュメント管理",
          "content": "API の長期的な運用には、適切なバージョニング戦略とドキュメント管理が不可欠です。URL パス、ヘッダー、クエリパラメータによるバージョニング手法の比較検討、後方互換性の維持、段階的な廃止プロセスを実装します。OpenAPI（Swagger）による自動ドキュメント生成、対話的なAPI探索環境の構築により、開発者体験の向上を図ります。",
          "images": []
        }
      ],
      "h3Sections": [
        {
          "title": "テスト戦略と品質保証",
          "content": "APIの品質を保証するため、単体テスト、統合テスト、契約テストを含む包括的なテスト戦略を策定し、継続的インテグレーションと連携した自動化を実現します。",
          "isInitialDesign": true
        }
      ],
      "bodyText": "RESTful API設計は、現代のWebアプリケーション開発における中核技術です。フロントエンドとバックエンドを疎結合で接続し、マイクロサービスアーキテクチャの基盤となる、高品質なAPIの設計・実装方法を詳しく学びましょう。",
      "conclusionTitle": "まとめ",
      "conclusionText": "優れたRESTful API設計により、スケーラブルで保守性の高いWebアプリケーションを構築できます。適切な設計原則、セキュリティ対策、ドキュメント管理により、開発者とユーザーの両方に価値を提供するAPIを実現できます。"
    }
  }
  ];

  return (
<section className="flex flex-col items-center bg-gray-50 w-full pt-24 px-4 pb-16 sm:pt-24 sm:px-6 sm:pb-16 lg:pt-24 lg:px-20 lg:pb-16">

  {/* Header */}
  <div className="text-center mb-12 relative w-full max-w-7xl">
    <h2 className="mx-auto w-full h-[48px] text-[32px] font-bold tracking-[5%] leading-[150%] text-gray-900 mb-2">ブログ</h2>
    <div className='w-full flex items-center justify-center gap-[10px]'>
      <div className='w-full h-[1px] bg-black border border-black'></div>
      <p className="text-xl font-medium tracking-[5%] leading-[150%]">BLOG</p>
      <div className='w-full h-[1px] bg-black border border-black'></div>
    </div>
  </div>

  {/* Blog Grid */}
  <div className="w-full grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mb-12">
    {blogPosts.map((post) => (
      <BlogCard
        key={post.id}
        {...post}
        onClick={() => onBlogClick(post.slug)}
      />
    ))}
  </div>

  {/* View All Button */}
  <div className="ml-auto cursor-pointer" onClick={() => router.push('/blogs')}>
    <div className='flex gap-4  items-center justify-center h-[34px] font-noto-sans-jp font-bold cursor-pointer tracking-[5%] leading-[150%]'>
      <p className='w-full  hover:text-[#AD002D]'>もっと見る</p>
      <div>
        <img className='h-full hover:text-[#AD002D]' srcSet="/arrow2.png" alt="" />
      </div>
    </div>
  </div>

</section>
  );
};

