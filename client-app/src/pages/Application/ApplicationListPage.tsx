import ApplicationListComponent from "../../components/Applications/ApplicationListComponent";

const ApplicationListPage = () => {
  return (
    <>
      <div className="container mx-auto mt-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Applications List
        </h1>

        <ApplicationListComponent />
      </div>
    </>
  );
};

export default ApplicationListPage;
