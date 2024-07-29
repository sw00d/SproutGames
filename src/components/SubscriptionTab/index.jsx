import clsx from "clsx"

function SubscriptionTab() {
    return (
        <div
            className={clsx(
                "rounded shadow bg-white py-4 px-3",
                'w-full flex'
            )}
        >
            {/* <div
                // Divider
                className='bg-highlight w-1 h-full mr-3'
            /> */}

            <div className="border-l-4 border-l-highlight h-full w-full pl-3">

                <div className="flex justify-between w-full">

                    <div
                        className='font-seymour text-xl'
                    >
                        What you get
                    </div>

                    <div
                        className='bg-highlight rounded-full font-bold text-white px-3 py-1'
                    >
                        $1/month
                    </div>
                </div>

                <div className='leading-6 mt-1'>
                    <div>• Backlink to your site</div>
                    <div>• Front page feature</div>
                    <div>• Increased visibility of your game</div>
                </div>

            </div>
        </div>
    );
}


export default SubscriptionTab