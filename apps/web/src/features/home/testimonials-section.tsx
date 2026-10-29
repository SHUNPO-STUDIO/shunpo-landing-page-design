import { Rating } from "@repo/ui/components/rating";
import { TestimonialCard } from "@repo/ui/components/testimonial-card";
import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Stack } from "@repo/ui/layout/stack";
import { MarqueeColumn } from "@repo/ui/motion/marquee-column";
import { MarqueeWall } from "@repo/ui/motion/marquee-wall";
import { Heading } from "@repo/ui/typography/heading";
import Image from "next/image";

import {
  testimonialColumns,
  testimonialsPause,
  testimonialsRating,
  testimonialsStars,
  testimonialsTitle,
} from "./testimonials-content";

export function TestimonialsSection() {
  return (
    <Section id="avis" tone="muted" spacing="lg" aria-labelledby="avis-title">
      <Container>
        <Stack gap="3xl">
          <Stack gap="md">
            <Heading level={2} size="display" align="center" id="avis-title">
              {testimonialsTitle}
            </Heading>
            <Rating starsLabel={testimonialsStars}>{testimonialsRating}</Rating>
          </Stack>
          <MarqueeWall pauseLabel={testimonialsPause}>
            {testimonialColumns.map((column) => (
              <MarqueeColumn key={column[0]?.name}>
                {column.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.name}
                    lang={testimonial.lang}
                    photo={<Image src={testimonial.photo} alt="" width={48} height={48} />}
                    name={testimonial.name}
                    jobTitle={testimonial.jobTitle}
                  >
                    {testimonial.quote}
                  </TestimonialCard>
                ))}
              </MarqueeColumn>
            ))}
          </MarqueeWall>
        </Stack>
      </Container>
    </Section>
  );
}
