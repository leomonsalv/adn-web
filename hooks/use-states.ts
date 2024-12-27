import venezuelaData from '@/lib/utils/venezuela.json';
import React from 'react';

export interface StateOption {
  value: string;
  label: string;
  id: number;
}

export interface MunicipalityOption {
  value: string;
  label: string;
  capital: string;
}

export interface CityOption {
  value: string;
  label: string;
}

export interface ParishOption {
  value: string;
  label: string;
}

export const useStates = () => {
  const states = venezuelaData.map((state) => ({
    value: state.iso_31662.substring(3),
    label: state.estado,
    id: state.id_estado,
  }));

  return { states };
};

export const useMunicipalities = (stateId?: number) => {
  if (!stateId) return { municipalities: [] };

  const state = venezuelaData.find((state) => state.id_estado === stateId);
  const municipalities =
    state?.municipios.map((municipality) => ({
      value: municipality.municipio,
      label: municipality.municipio,
      capital: municipality.capital,
    })) || [];

  return { municipalities };
};

export const useCities = (stateId?: number) => {
  if (!stateId) return { cities: [] };

  const state = venezuelaData.find((state) => state.id_estado === stateId);
  const cities =
    state?.ciudades?.map((city) => ({
      value: city,
      label: city,
    })) || [];

  return { cities };
};

export const useParishes = (stateId?: number, municipalityName?: string) => {
  if (!stateId || !municipalityName) return { parishes: [] };

  const state = venezuelaData.find((state) => state.id_estado === stateId);
  const municipality = state?.municipios.find((m) => m.municipio === municipalityName);

  const parishes =
    municipality?.parroquias.map((parish) => ({
      value: parish,
      label: parish,
    })) || [];

  return { parishes };
};

// Un todo incluido para manejar la ubicación de un usuario en Venezuela
export const useLocation = () => {
  const { states } = useStates();
  const [selectedState, setSelectedState] = React.useState<number>();
  const [selectedMunicipality, setSelectedMunicipality] = React.useState<string>();

  const { municipalities } = useMunicipalities(selectedState);
  const { cities } = useCities(selectedState);
  const { parishes } = useParishes(selectedState, selectedMunicipality);

  const handleStateChange = (stateId: number) => {
    setSelectedState(stateId);
    setSelectedMunicipality(undefined);
  };

  const handleMunicipalityChange = (municipalityName: string) => {
    setSelectedMunicipality(municipalityName);
  };

  return {
    states,
    municipalities,
    cities,
    parishes,
    selectedState,
    selectedMunicipality,
    handleStateChange,
    handleMunicipalityChange,
  };
};
