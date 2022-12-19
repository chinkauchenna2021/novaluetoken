import CreateSessionLayout from "components/layouts/CreateSessionLayout";
import CreateFreeGame  from "components/layouts/FreeToPlayLayout/CreateFreeGame";

const CreateFreeGameContainer = () => {
  return (
    <CreateSessionLayout>
      <CreateFreeGame />
    </CreateSessionLayout>
  );
};

export default CreateFreeGameContainer;
