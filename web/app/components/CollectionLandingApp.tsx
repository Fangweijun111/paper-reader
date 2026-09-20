"use client";

import Link from "next/link";
import { useState } from "react";
import type { CollectionSummary } from "../lib/collections";
import type { LibraryCounts } from "../lib/library";
import { CreatePaperDialog } from "./CreatePaperDialog";

type CollectionLandingAppProps = {
  collections: CollectionSummary[];
  counts: LibraryCounts;
};

const accentLabels: Record<CollectionSummary["accent"], string> = {
  cobalt: "COBALT INDEX",
  vermilion: "VERMILION INDEX",
  moss: "MOSS INDEX",
  ochre: "OCHRE INDEX",
};

export function CollectionLandingApp({
  collections,
  counts,
}: CollectionLandingAppProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <main className="library-page collection-index-page">
      <header className="library-nav">
        <Link className="library-brand" href="/">
          <span>PA</span>
          <div>
            <strong>Paper Atlas</strong>
            <small>论文精读库</small>
          </div>
        </Link>
        <nav aria-label="论文库导航">
          <a href="#collections">主题书架</a>
          <Link href="/collections/world-models">世界模型</Link>
          <button onClick={() => setIsCreateOpen(true)} type="button">
            ＋ 创建新论文
          </button>
        </nav>
      </header>

      <section className="library-hero collection-index-hero">
        <div className="library-hero__copy">
          <span className="library-eyebrow">A RESEARCH LIBRARY BY TOPIC</span>
          <h1>
            One atlas.
            <br />
            <em>Many fields</em> to explore.
          </h1>
          <p>
            按研究主题组织的个人论文精读库。每个书架独立生长，同时保留英文原文、中文对照、论文图表和证据定位。
          </p>
          <a className="library-primary-link" href="#collections">
            浏览主题书架 <span aria-hidden="true">↓</span>
          </a>
        </div>

        <aside className="collection-index-note" aria-label="论文库组织方式">
          <span>CATALOGUE · 2026</span>
          <strong>{String(collections.length).padStart(2, "0")}</strong>
          <p>ACTIVE COLLECTIONS</p>
          <dl>
            <div>
              <dt>论文总数</dt>
              <dd>{counts.all}</dd>
            </div>
            <div>
              <dt>已完成</dt>
              <dd>{counts.completed}</dd>
            </div>
            <div>
              <dt>精读中</dt>
              <dd>{counts.reading}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section
        aria-labelledby="collection-index-heading"
        className="library-collection-index"
        id="collections"
      >
        <header className="collection-index-heading">
          <div>
            <span className="library-eyebrow">THE COLLECTION INDEX</span>
            <h2 id="collection-index-heading">主题书架</h2>
          </div>
          <p>选择一个研究方向，进入它自己的论文空间。</p>
        </header>

        <div className="collection-index-grid">
          {collections.map((collection, index) => (
            <Link
              className={`collection-card collection-card--${collection.accent}`}
              href={`/collections/${collection.slug}`}
              key={collection.slug}
            >
              <div className="collection-card__topline">
                <span>{accentLabels[collection.accent]}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="collection-card__number" aria-hidden="true">
                {String(collection.paperCount).padStart(2, "0")}
              </div>
              <div className="collection-card__body">
                <span>{collection.eyebrow}</span>
                <h2>{collection.titleZh}</h2>
                <h3>{collection.titleEn}</h3>
                <p>{collection.description}</p>
              </div>
              <footer className="collection-card__meta">
                <span>{collection.paperCount} 篇论文</span>
                <span>{collection.latestUpdate ? `更新于 ${collection.latestUpdate}` : "等待第一篇论文"}</span>
                <strong>
                  进入书架 <i aria-hidden="true">↗</i>
                </strong>
              </footer>
            </Link>
          ))}
        </div>
      </section>

      <section className="collection-index-invite">
        <span className="library-eyebrow">EXPAND THE ATLAS</span>
        <h2>下一条研究支线，从下一篇论文开始。</h2>
        <p>添加医学 AI、Agent、数据集或其他主题时，会建立新的独立书架。</p>
        <button onClick={() => setIsCreateOpen(true)} type="button">
          创建新论文 <span aria-hidden="true">→</span>
        </button>
      </section>

      <footer className="library-footer">
        <span>Paper Atlas · 论文精读库</span>
        <p>按主题收藏 · 逐篇精读 · 证据可追溯</p>
      </footer>

      {isCreateOpen ? (
        <CreatePaperDialog onClose={() => setIsCreateOpen(false)} />
      ) : null}
    </main>
  );
}
