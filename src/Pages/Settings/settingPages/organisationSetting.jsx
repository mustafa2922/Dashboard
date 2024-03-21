import DashboardHeader from "../../../Components/DashboardHeader";
import "./organisationSetting.css";

export default function OrganisationSetting() {
  return (
    <main className="w-full h-full">
      <DashboardHeader title="Organisation Settings" />

      <button className="edit-button">Edit settings</button>

      <article className="settings-table">
        <p>Organisation name</p>
        <p>TravBizzz</p>
        <p>Email (Invoicing use)</p>
        <p>crm@travbizz.com</p>
        <p>Phone (Invoicing use)</p>
        <p>1234567890</p>
        <p>Address</p>
        <p>4rth floor, C-54, Sector 2 Noida 201301.</p>
        <p>GSTN</p>
        <p>ASKDJ3437</p>
        <p>State</p>
        <p>Uttar Pradesh</p>
        <p>State code</p>
        <p>India</p>
      </article>
    </main>
  );
}
