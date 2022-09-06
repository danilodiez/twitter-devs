import Link from 'next/link'

export const getStaticProps = async () => {
  return {
    props: {
      userName: 'Danilo'
    }
  }
}


export default function Timeline({ userName }) {
  return (
  <>
  <h1>Ultimos tweets de {userName}</h1>
  <Link href={'/'} >
    <a>
      Volver al Home
    </a>
  </Link>
  </>)
}
