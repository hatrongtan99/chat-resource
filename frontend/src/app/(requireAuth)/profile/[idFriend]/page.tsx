import ProfileWrapper from "@/components/profile/ProfileFriendWrapper";

const page = ({ params: { idFriend } }: { params: { idFriend: string } }) => {
    return <ProfileWrapper idFriend={parseInt(idFriend)} />;
};

export default page;
