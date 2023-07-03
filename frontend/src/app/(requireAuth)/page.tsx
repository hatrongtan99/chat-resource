import { redirect } from "next/navigation";

const HomePage = () => {
    redirect("/conversations");
};

export default HomePage;
