import { IdBadge } from "@repo/ui/components/id-badge";
import { Lanyard } from "@repo/ui/components/lanyard";
import { Inline } from "@repo/ui/layout/inline";
import Image from "next/image";

import { teamMembers, teamTag } from "./team-content";

export function TeamBadges() {
  return (
    <Inline as="ul" justify="center" align="start" gap="none">
      {teamMembers.map((member, order) => (
        <Lanyard key={member.jobTitle} as="li" tilt={member.tilt} order={order}>
          <IdBadge
            image={
              <Image src={member.portrait} alt={member.portraitAlt} width={128} height={128} />
            }
            tag={teamTag}
            jobTitle={member.jobTitle}
            profile={member.profile}
          >
            {member.description}
          </IdBadge>
        </Lanyard>
      ))}
    </Inline>
  );
}
