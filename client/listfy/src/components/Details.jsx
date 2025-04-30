import React from 'react';

const Details = (props) => {
    return (
        <div className="content__wrapper mb-5 min-w-[300px]">
            <div className="flex flex-grow justify-center items-center mt-5">
                <div className="grid grid-cols-3 gap-6">
                    {/* All Tasks */}
                    <div className="flex flex-col items-center">
                        <h1 className="mb-2 text-[#646ff0] text-3xl">{props.allTasksNum}</h1>
                        <h4 className="mb-1 text-[#585858]">All</h4>
                    </div>

                    {/* Completed Tasks */}
                    <div className="flex flex-col items-center">
                        <h1 className="mb-2 text-[#646ff0] text-3xl">{props.completedNum}</h1>
                        <h4 className="mb-1 text-[#585858]">Completed</h4>
                    </div>

                    {/* Incompleted Tasks */}
                    <div className="flex flex-col items-center">
                        <h1 className="mb-2 text-[#646ff0] text-3xl">{props.allTasksNum - props.completedNum}</h1>
                        <h4 className="mb-1 text-[#585858]">Pending</h4>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Details;
