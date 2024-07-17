import Layout from "../layouts/Layout";

import UserProfileForm from "../components/forms/user/UserProfileForm";

function UserProfile() {
  return (
    <Layout>
      <div className="container">
        <UserProfileForm isLoading={false} onSave={() => {}} />
      </div>
    </Layout>
  );
}

export default UserProfile;
