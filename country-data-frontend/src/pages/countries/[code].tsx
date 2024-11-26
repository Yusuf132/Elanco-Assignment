import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CountryDetailPage() {
  const router = useRouter();
  const { code } = router.query;

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (code) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/countries/${code}`
          );
          setCountry(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to load country details');
          setLoading(false);
        }
      };
      fetchCountry();
    }
  }, [code]);

  if (loading) return 'Loading....';

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        
        <Image
            className="w-full h-48 object-cover rounded-lg mb-6"
            src={country.flag}
            alt={`Flag of ${country.name}`}
            width={600}
            height={900}
        />
        <h2 className="text-2xl font-bold mb-4">{country.name}</h2>
        <p className="text-lg mb-4">
          <span className="font-semibold">Population:</span> {country.population}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Currency:</span> {country.currency}
          </p>
          <p>
            <span className="font-semibold">Capital:</span> {country.capital}
          </p>
          <p>
            <span className="font-semibold">Languages:</span>{' '}
            {Object.values(country.languages).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}