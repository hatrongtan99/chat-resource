import MessagePrivateWrapper from "@/components/messages/MessagePrivateWrapper";

const page = ({ params: { id } }: { params: { id: string } }) => {
    return <MessagePrivateWrapper conversationId={parseInt(id)} />;
};

export default page;
