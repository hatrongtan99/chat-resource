import Modal from "@/components/common/modal/Modal";
import ProfileWrapper from "@/components/profile/ProfileWrapper";

const page = ({ params: { idFriend } }: { params: { idFriend: string } }) => {
    return (
        <Modal>
            <div className="bg-bgDarkmode rounded-lg 2xl:min-h-[800px] min-h-[700px] xl:mx-40 lg:mx-24 overflow-y-auto h-auto">
                <div className="mx-5">
                    <ProfileWrapper idFriend={idFriend} />
                </div>
            </div>
        </Modal>
    );
};

export default page;
