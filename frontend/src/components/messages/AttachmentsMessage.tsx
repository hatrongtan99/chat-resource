import { Attachment, TypeFile } from "@/types/Message";
import Image from "next/image";
import React from "react";

const AttachmentsMessage = ({ attachments }: { attachments: Attachment[] }) => {
    return (
        <div className="w-full">
            {Object.keys(TypeFile).map((typeFile) => {
                if (typeFile === TypeFile.IMAGE) {
                    return (
                        <div className="grid-cols-3 gap-2" key={typeFile}>
                            {attachments
                                ?.filter((att) => att.type === typeFile)
                                ?.map((item) => {
                                    if (typeFile === TypeFile.IMAGE)
                                        return (
                                            <div
                                                className="col-span-1 w-[50px] h-[50px] relative"
                                                key={item.id}
                                            >
                                                <Image
                                                    src={item.url}
                                                    alt="image"
                                                    fill
                                                />
                                            </div>
                                        );
                                })}
                        </div>
                    );
                }
                if (typeFile === TypeFile.VIDEO) {
                    return attachments
                        ?.filter((att) => att.type === typeFile)
                        ?.map((item) => (
                            <div className="w-[200px] h-auto" key={item.id}>
                                <video src={item.url} controls></video>
                            </div>
                        ));
                } else {
                    return attachments
                        ?.filter((att) => att.type === typeFile)
                        ?.map((item) => (
                            <div className="" key={item.id}>
                                <></>
                            </div>
                        ));
                }
            })}
        </div>
    );
};

export default AttachmentsMessage;
