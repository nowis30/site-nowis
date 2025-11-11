// Page minimale nécessaire pour que Next.js construise le projet.
// Redirection côté serveur vers l'application existante.

export async function getServerSideProps() {
  return {
    redirect: {
      destination: 'https://client-jeux-millionnaire.vercel.app/',
      permanent: false,
    },
  };
}

export default function BridgeIndex() {
  return null;
}
