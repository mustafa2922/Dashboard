import { useId } from "react";
import Editor from "../../../Components/Editor";
import DashboardHeader from "../../../Components/DashboardHeader";
import "./packagesInclusions.css";

export default function PackagesInclusions() {
  const id = useId();

  return (
    <main className="p-5"  >
      <DashboardHeader title="Package Inclusions / Exclusion Setting" />

      <section className="editor-section">
        <div className="title-fields">
          <label htmlFor={`${id}-inclusion-title`}>Inclusions Title</label>
          <input id={`${id}-inclusion-title`} type="text" />
        </div>

        <div className="editor-box">
          <h2>Inclusions</h2>
          <Editor />
        </div>
      </section>

      <section className="editor-section">
        <div className="title-fields">
          <label htmlFor={`${id}-important-tips-title`}>
            Important Tips Title
          </label>
          <input id={`${id}-important-tips-title`} type="text" />
        </div>

        <div className="editor-box">
          <h2>Important Tips</h2>
          <Editor />
        </div>
      </section>

      <section className="editor-section">
        <div className="title-fields">
          <label htmlFor={`${id}-exclusions-title`}>Exclusions Title</label>
          <input id={`${id}-exclusions-title`} type="text" />
        </div>

        <div className="editor-box">
          <h2>Exclusions</h2>
          <Editor />
        </div>
      </section>

      <section className="editor-section">
        <div className="title-fields">
          <label htmlFor={`${id}-documents-title`}>
            List of documents for traveling Title
          </label>
          <input id={`${id}-documents-title`} type="text" />
        </div>

        <div className="editor-box">
          <h2>List of documents for traveling</h2>
          <Editor />
        </div>
      </section>

      <button className="submit-button">Save settings</button>
    </main>
  );
}
