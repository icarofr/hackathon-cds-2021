import Head from "next/head";
import Search from "../components/Search";

export async function getServerSideProps() {
  const res = await fetch("https://bookings.cdsgroupe.com/api-hackathon/v1/Authenticate", {
    method: "POST", body: JSON.stringify({
      "Username": process.env.NEXT_PUBLIC_USER,
      "Password": process.env.NEXT_PUBLIC_PASS
    })
  });
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { token: data.Token },
  }
}

export default function Home({ token }) {
  return <Search token={token} />;
}
