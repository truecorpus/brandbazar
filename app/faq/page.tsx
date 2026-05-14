'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { faqCategories, faqItems, getHighPriorityFAQs, searchFAQs } from '@/lib/faq/data';
import { FAQItem } from '@/lib/faq/types';
import { FAQHero } from '@/components/faq/FAQHero';
import { FAQCategoryNav } from '@/components/faq/FAQCategoryNav';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { FAQSuggested } from '@/components/faq/FAQSuggested';
import { FAQTrustSignals } from '@/components/faq/FAQTrustSignals';
import { FAQContactCTA } from '@/components/faq/FAQContactCTA';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    faqCategories.forEach((cat) => {
      counts[cat.id] = faqItems.filter((item) => item.categoryId === cat.id).length;
    });
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    let items = faqItems;
    if (searchQuery.trim()) {
      items = searchFAQs(searchQuery);
    }
    if (activeCategory) {
      items = items.filter((item) => item.categoryId === activeCategory);
    }
    return items;
  }, [searchQuery, activeCategory]);

  const suggestedItems = useMemo(() => getHighPriorityFAQs(6), []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setActiveCategory(null);
    }
  }, []);

  const handleSuggestedSelect = useCallback((item: FAQItem) => {
    setActiveCategory(item.categoryId);
    setSearchQuery('');
    setTimeout(() => {
      const el = document.getElementById('faq-accordion');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <FAQHero
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        resultCount={filteredItems.length}
        isSearching={isSearching}
      />

      <FAQCategoryNav
        categories={faqCategories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
        counts={categoryCounts}
      />

      {!isSearching && !activeCategory && (
        <FAQSuggested
          items={suggestedItems}
          categories={faqCategories}
          onSelect={handleSuggestedSelect}
        />
      )}

      <section id="faq-accordion" className="relative section overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-ivory/20 to-white" />
        <div className="container-brand relative z-10">
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <p className="text-[15px] text-charcoal/40">
                {filteredItems.length > 0 ? (
                  <>
                    Found <span className="font-medium text-rich">{filteredItems.length}</span> result
                    {filteredItems.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
                  </>
                ) : (
                  <>
                    No results for &ldquo;{searchQuery}&rdquo;. Try a different keyword or{' '}
                    <button
                      onClick={() => { setSearchQuery(''); setActiveCategory(null); }}
                      className="text-electric hover:underline"
                    >
                      browse all questions
                    </button>
                    .
                  </>
                )}
              </p>
            </motion.div>
          )}

          <FAQAccordion
            items={filteredItems}
            categories={faqCategories}
            categoryId={activeCategory || undefined}
          />
        </div>
      </section>

      <FAQTrustSignals />
      <FAQContactCTA />
    </>
  );
}
