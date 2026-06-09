"use client";

import { useState } from "react";
import { BookOpen, Heart, Sun } from "lucide-react";
import {
  ColorTokens,
  FontTokens,
  RadiiTokens,
  Section,
  ShadowTokens,
  SpacingTokens,
  TypeTokens,
} from "@/components/storybook/showcases";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/IconButton";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { Avatar } from "@/components/ui/Avatar";
import { BookCard } from "@/components/ui/BookCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { GenreChip } from "@/components/ui/GenreChip";
import { Segmented } from "@/components/ui/Segmented";
import { ThemeSegmented } from "@/components/ui/ThemeSegmented";
import { Switch } from "@/components/ui/Switch";
import { BrandGlyph } from "@/components/brand/BrandGlyph";
import { HeroArt } from "@/components/brand/HeroArt";
import { books } from "../_data/books";
import { chip } from "../classes/ui";
import { storybook as s } from "../classes/storybook";

export default function StorybookPage() {
  const [segment, setSegment] = useState("one");

  return (
    <div className={s.view}>
      <div className={s.head}>
        <h1 className={s.headTitle}>Storybook</h1>
        <p className={s.headSub}>
          Design tokens & components — a living cheat sheet. Toggle theme to
          preview light and dark.
        </p>
      </div>

      <Section title="Core">
        <div className={s.card}>
          <div className="font-serif text-[length:var(--text-md)] font-semibold text-ink">
            Button
          </div>
          <p className="mb-[var(--space-5)] text-[length:var(--text-sm)] text-muted-foreground">
            Terracotta CTA with variants, sizes, icons, loading.
          </p>

          <div className={s.subTitle}>Button — variants</div>
          <div className="mb-[var(--space-5)] flex flex-wrap items-center gap-[var(--space-4)]">
            <Button>
              <BookOpen />
              Read now
            </Button>
            <Button variant="outline">Add to my library</Button>
            <Button variant="ghost">Choose mode</Button>
            <Button variant="destructive">Delete data</Button>
            <Button loading>Saving</Button>
            <Button disabled>Disabled</Button>
          </div>

          <div className={s.subTitle}>Button — sizes</div>
          <div className="mb-[var(--space-5)] flex flex-wrap items-center gap-[var(--space-4)]">
            <Button size="sm">Small</Button>
            <Button size="default">Medium</Button>
            <Button size="lg">
              <BookOpen />
              Read now
            </Button>
          </div>

          <div className={s.subTitle}>IconButton · Badge · Tag · Avatar</div>
          <div className="flex flex-wrap items-center gap-[var(--space-4)]">
            <IconButton variant="outline" aria-label="Font">
              <span className="font-serif text-[length:var(--text-sm)]">Aa</span>
            </IconButton>
            <IconButton variant="ghost" aria-label="Toggle theme">
              <Sun />
            </IconButton>
            <IconButton variant="soft" aria-label="Font tint">
              <span className="font-serif text-[length:var(--text-sm)]">Aa</span>
            </IconButton>
            <Badge tone="teal">Bilingual</Badge>
            <Badge tone="accent">~30p</Badge>
            <Badge tone="success" dot>
              Known
            </Badge>
            <Tag tone="accent" label="Romance" count={120} icon={<Heart />} />
            <Tag tone="neutral" label="Adventure" count={88} />
            <Avatar initials="LP" tone="accent" />
            <Avatar initials="AV" tone="teal" />
          </div>
        </div>
      </Section>

      <Section title="Colors">
        <ColorTokens />
      </Section>
      <Section title="Typography">
        <TypeTokens />
      </Section>
      <Section title="Fonts">
        <FontTokens />
      </Section>
      <Section title="Spacing">
        <SpacingTokens />
      </Section>
      <Section title="Radii">
        <RadiiTokens />
      </Section>
      <Section title="Shadows">
        <ShadowTokens />
      </Section>

      <Section title="Chips & progress">
        <div className={s.card}>
          <div className={s.stack}>
            <div className="flex flex-wrap gap-2">
              <GenreChip label="Classic" />
              <GenreChip label="Romance" />
              <GenreChip label="Sci-Fi" />
              <span className={chip.bilingual}>Song ngữ</span>
            </div>
            <ProgressBar value={42} caption="42% · ~5h còn lại" />
            <ProgressBar value={80} caption="80%" />
          </div>
        </div>
      </Section>

      <Section title="Controls">
        <div className={s.card}>
          <div className="flex flex-wrap items-center gap-[var(--space-5)]">
            <Segmented
              value={segment}
              onChange={setSegment}
              options={[
                { value: "one", label: "One" },
                { value: "two", label: "Two" },
                { value: "three", label: "Three" },
              ]}
            />
            <ThemeSegmented />
            <Switch checked />
            <Switch />
          </div>
        </div>
      </Section>

      <Section title="Book card">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-[var(--space-4)]">
          {books.slice(0, 4).map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              genres={book.genres}
              estMinutes={book.estMinutes}
              hasBilingual={book.hasBilingual}
            />
          ))}
        </div>
      </Section>

      <Section title="Brand">
        <div className={s.card}>
          <div className="flex flex-wrap items-center gap-[var(--space-6)]">
            <BrandGlyph className="size-[44px] text-accent" />
            <HeroArt className="h-auto w-[220px] text-ink" />
          </div>
        </div>
      </Section>
    </div>
  );
}
