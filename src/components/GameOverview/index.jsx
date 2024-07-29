import Image from 'next/image';
import dynamic from 'next/dynamic';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

const GameOverview = ({ game }) => {
    return (
        <div>
            <div className="relative aspect-video">
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                    {game.image && (
                        <Image
                            src={game.image}
                            alt={game.title}
                            layout="fill"
                            objectFit="cover"
                        />
                    )}
                </div>
            </div>

            <div className='flex gap-3 mt-8 flex-col md:flex-row justify-between'>

                <div className='max-w-[400px]'>
                    <h2 className="text-gray-600 font-bold text-xl mb-2 truncate">
                        {game.title || "[Game Title]"}
                    </h2>
                    <p className="text-gray-600">
                        {game.description || "Lorem ipsum dolor sit amet, consectetur. lorem ipsum dolor sit amet, consectetur!"}
                    </p>
                </div>

                <a
                    href={game.website}
                >
                    <button
                        className={clsx(
                            'text-white bg-highlight md:px-16 w-full py-4 text-xl text-bold rounded-lg text-nowrap'
                        )}
                    >
                        <strong>Check it out</strong>
                    </button>
                </a>
            </div>

            <hr className='my-8' />

            <div>
                <ReactMarkdown
                    remarkPlugins={[remarkBreaks, remarkGfm]}
                    components={{
                        h1: ({ node, ...props }) => <h1 style={markdownStyles.h1} {...props} />,
                        h2: ({ node, ...props }) => <h2 style={markdownStyles.h2} {...props} />,
                        h3: ({ node, ...props }) => <h3 style={markdownStyles.h3} {...props} />,
                        h4: ({ node, ...props }) => <h4 style={markdownStyles.h4} {...props} />,
                        h5: ({ node, ...props }) => <h5 style={markdownStyles.h5} {...props} />,
                        h6: ({ node, ...props }) => <h6 style={markdownStyles.h6} {...props} />,
                        a: ({ node, ...props }) => <a className='text-highlight underline' {...props} />,
                    }}
                >
                    {game.overview}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default GameOverview;


const markdownStyles = {
    h1: {
        fontSize: '2em',
        fontWeight: 'bold',
        marginTop: '0.67em',
        marginBottom: '0.67em',
    },
    h2: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginTop: '0.83em',
        marginBottom: '0.83em',
    },
    h3: {
        fontSize: '1.17em',
        fontWeight: 'bold',
        marginTop: '1em',
        marginBottom: '1em',
    },
    h4: {
        fontSize: '1em',
        fontWeight: 'bold',
        marginTop: '1.33em',
        marginBottom: '1.33em',
    },
    h5: {
        fontSize: '0.83em',
        fontWeight: 'bold',
        marginTop: '1.67em',
        marginBottom: '1.67em',
    },
    h6: {
        fontSize: '0.67em',
        fontWeight: 'bold',
        marginTop: '2.33em',
        marginBottom: '2.33em',
    },
};