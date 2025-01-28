import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { getRegion } from '../api/regionData';
import { getCountry } from '../api/countryData';

export default function RegionDropDown() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    getRegion().then(setRegions);
  }, []);

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountry().then(setCountries);
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">Region</Dropdown.Toggle>
      <Dropdown.Menu>
        {regions.map((region) => (
          <DropdownButton key={region.id} href="#/" drop="end" title={region.name}>
            {countries
              .filter((country) => country.region === region.id)
              .map((country) => (
                <Dropdown.Item href={`country/${country.id}`}>{country.name}</Dropdown.Item>
              ))}
          </DropdownButton>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
