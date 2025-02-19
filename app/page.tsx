import BoardList from "@/app/_components/BoardList";
import AddBoardButton from "@/app/_components/AddBoardButton";

export default function Home() {

    return <div className={'w-full h-full flex flex-col'}>
        <div className={'pt-10 px-8 flex gap-4 items-center'}>
            <h1 className={'text-title'}>TO DO BOARD</h1>
            <AddBoardButton/>
        </div>
        <BoardList/>
    </div>;
}
