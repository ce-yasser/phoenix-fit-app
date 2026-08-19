import { IoMdFlame } from "react-icons/io";
import type { ProgramCategory } from "@interfaces";
function CompetitionProgramComponent({
  selectedProgram,
}: {
  selectedProgram: ProgramCategory;
}) {
  return (
    <section className="pf-program pf-reg__card">
      <h3>Competition Program</h3>
      {selectedProgram.qualifier && (
        <>
          <div className="pf-program__round">
            <p className="pf-program__round-title">Qualifier</p>
            <ul className="pf-program__round-list">
              {selectedProgram.qualifier.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="pf-program__bracket" role="presentation">
            <span className="pf-program__bracket-line" />
            <span className="pf-program__bracket-badge">
              <IoMdFlame />
              Rise to the Final
            </span>
            <span className="pf-program__bracket-line" />
          </div>
        </>
      )}
      <div className="pf-program__round">
        {selectedProgram.qualifier && <p className="pf-program__round-title">Final</p>}
        <ul className="pf-program__round-list">
          {selectedProgram.final.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CompetitionProgramComponent;
