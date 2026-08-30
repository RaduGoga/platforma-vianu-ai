"use client";

import { ArrowUpRight } from "lucide-react";
import { useT } from "@/components/lang-provider";
import { Echipa } from "@/components/echipa";

export function DespreView() {
  const t = useT();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="space-y-6 text-lg leading-relaxed text-[var(--muted)]">
        <p>
          {t(
            "Clubul ține lecții săptămânale, atât fizic cât și pe Discord. Lecțiile sunt scrise chiar de noi, parcurgând materia oficială pentru olimpiadă. Ocazional au loc și lecții speciale sau concursuri / alte evenimente.",
            "The club runs weekly lessons, both in person and on Discord. The lessons are written by us, working through the official olympiad syllabus. Occasionally there are special lessons, contests or other events."
          )}
        </p>
        <p>
          {t(
            "Olimpiada are trei etape, locală, județeană și națională, iar cei mai buni intră în lotul care reprezintă România la IOAI / IAIO. Resursele bune există, dar sunt împrăștiate, iar în română sunt puține.",
            "The olympiad has three stages, local, county and national, and the best students make the team that represents Romania at IOAI / IAIO. Good resources exist, but they're scattered, and few are in Romanian."
          )}
        </p>
        <p>
          {t(
            "Am făcut această platformă așa cum ni s-a părut nouă cel mai eficient, din experiența noastră de la olimpiadă. Oricine este binevenit să o folosească. ",
            "We built this platform the way that felt most effective to us, from our own experience at the olympiad. Anyone is welcome to use it."
          )}
        </p>
      </div>

      <Echipa />
    </div>
  );
}
