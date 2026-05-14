import { SolutionData } from '@/lib/solutions/types';
import { SolutionHero } from './SolutionHero';
import { SolutionProcess } from './SolutionProcess';
import { SolutionMockups } from './SolutionMockups';
import { SolutionPsychology } from './SolutionPsychology';
import { SolutionTransformation } from './SolutionTransformation';
import { SolutionFAQ } from './SolutionFAQ';
import { SolutionCTA } from './SolutionCTA';
import { SolutionRelated } from './SolutionRelated';

interface SolutionPageTemplateProps {
  solution: SolutionData;
}

export function SolutionPageTemplate({ solution }: SolutionPageTemplateProps) {
  return (
    <>
      {/* Cinematic Hero */}
      <SolutionHero solution={solution} />

      {/* Process Storytelling */}
      <SolutionProcess solution={solution} />

      {/* Premium Mockups */}
      <SolutionMockups solution={solution} />

      {/* Branding Psychology */}
      <SolutionPsychology solution={solution} />

      {/* Transformation Narrative */}
      <SolutionTransformation solution={solution} />

      {/* FAQ Accordion */}
      <SolutionFAQ solution={solution} />

      {/* Conversion CTA */}
      <SolutionCTA solution={solution} />

      {/* Related Solutions */}
      <SolutionRelated solution={solution} />
    </>
  );
}
