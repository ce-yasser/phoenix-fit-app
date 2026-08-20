import { useParams } from "react-router-dom";
import CompetitionDetailComponent from "@components/competition/CompetitionDetailComponent";
import { useEffect, useMemo, useState } from "react";
import { getCompetitionDetails } from "@services/competitionApi";
import type { CompetitionData, ProgramCategory } from "@interfaces";
import {
  useFetchPrograms,
  useProgramsData,
  useProgramsLoading,
} from "@store/hooks/programsHooks";
import CompetitionSummaryComponent from "@components/competition/CompetitionSummaryComponent";

function CompetitionDetailPage() {
  const { id } = useParams();
  const [competition, setCompetition] = useState<CompetitionData | null>(null);
  const programs = useProgramsData();
  const loading = useProgramsLoading();
  const fetchPrograms = useFetchPrograms();

  useEffect(() => {
    if (!programs && !loading) {
      fetchPrograms();
    }
  }, [fetchPrograms, loading, programs]);

  useEffect(() => {
    if (!id) return;

    const fetchCompetitionDetails = async () => {
      const competitionDetails = await getCompetitionDetails(id);
      setCompetition(competitionDetails);
    };

    fetchCompetitionDetails();
  }, [id]);

  const selectedProgram = useMemo<ProgramCategory | null>(() => {
    if (!programs || !competition) {
      return null;
    }

    if (competition.data.age < 18) {
      return programs.kids;
    }

    const divisionKey = competition.data.gender === "male" ? "men" : "women";
    const division = programs[divisionKey];

    if (!division) {
      return null;
    }

    console.log(competition, programs);
    return (
      division.find(
        (program) =>
          program.title.toLowerCase() === competition.data.level.toLowerCase(),
      ) ??
      division[0] ??
      null
    );
  }, [competition, programs]);

  if (!id || !competition) {
    return <>LOADING...</>;
  }

  return (
    <section className="pf-reg pf-container">
      <div className="pf-row">
        <CompetitionDetailComponent
          competition={competition}
          selectedProgram={selectedProgram}
          setCompetition={setCompetition}
        />
        <CompetitionSummaryComponent
          details={competition.data}
          selectedProgram={selectedProgram}
        />
      </div>
    </section>
  );
}

export default CompetitionDetailPage;
