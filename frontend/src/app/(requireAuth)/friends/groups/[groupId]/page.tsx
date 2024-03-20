import GroupMessageWrapper from "@/components/groupMessage/GroupMessageWrapper";

const page = ({ params: { groupId } }: { params: { groupId: string } }) => {
    return <GroupMessageWrapper groupId={parseInt(groupId)} />;
};

export default page;
