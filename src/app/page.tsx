import { Carpenter, Handyman } from '@mui/icons-material';

export default function Home() {
  return (
    <>
      <h1 className='text-4xl'>Home</h1>
      <div>
        <Handyman />
        Under Construction
        <Carpenter />
      </div>
    </>
  );
}
