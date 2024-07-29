export default function Game({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      {/* Add more game details here */}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { title: params.title },
  };
}
