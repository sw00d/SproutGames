import clsx from "clsx"

function SubscriptionTab() {
    return (
        <div
            className={clsx(
                "rounded shadow bg-white py-4 px-3",
                'w-full flex'
            )}
        >
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

                <div className='leading-6 mt-2'>
                    <div>• <strong>Backlink</strong> to elevate your online presence</div>
                    <div>• <strong>Front page showcase</strong> for maximum exposure</div>
                    <div>• <strong>Optimize SEO</strong> to reach wider audiences</div>
                    <div>• <strong>Funnel traffic</strong> to your game</div>
                    <i>• More coming soon...</i>
                </div>

            </div>
        </div>
    );
}


export default SubscriptionTab