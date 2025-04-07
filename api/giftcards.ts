import { API_URL } from '@/lib/urls';
import {
  GiftcardListResponse,
  GiftcardCreateRequest,
  GiftcardCreateResponse,
  GiftcardRedeemRequest,
  GiftcardRedeemResponse,
  GiftcardValidateRequest,
  GiftcardValidateResponse,
} from '@/types/giftcard';

/**
 * Obtiene la lista de giftcards para administración
 */
export const getGiftcardsList = async (): Promise<GiftcardListResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/giftcards/admin/list`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const giftcards = await response.json();
    return giftcards;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching giftcards list:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching giftcards list');
  }
};

/**
 * Obtiene la lista de giftcards creadas por el usuario autenticado
 */
export const getUserGiftcards = async (token: string): Promise<GiftcardListResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/giftcards/list`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid or expired token');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const giftcards = await response.json();
    return giftcards;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching user giftcards:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching user giftcards');
  }
};

/**
 * Crea una nueva giftcard (machine to machine)
 * @param data - Datos para crear la giftcard (amount, description, expires_at, user_id)
 * @param token - Token de autorización
 */
export const createGiftcard = async (
  data: GiftcardCreateRequest,
  token: string,
): Promise<GiftcardCreateResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/giftcards/m2m/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid or expired token');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const createdGiftcard = await response.json();
    return createdGiftcard;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating giftcard:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while creating giftcard');
  }
};

/**
 * Canjea una giftcard y la asigna al usuario autenticado
 * @param data - Datos para canjear la giftcard (code)
 * @param token - Token de autorización del usuario
 */
export const redeemGiftcard = async (
  data: GiftcardRedeemRequest,
  token: string,
): Promise<GiftcardRedeemResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/giftcards/redeem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token expirado o inválido, por favor inicia sesión de nuevo');
      } else if (response.status === 403) {
        throw new Error('No puedes canjear esta tarjeta de regalo');
      } else if (response.status === 404) {
        throw new Error('Tarjeta de regalo no encontrada');
      } else if (response.status === 400) {
        throw new Error('Código de tarjeta de regalo inválido o ya ha sido canjeado');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error redeeming giftcard:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while redeeming giftcard');
  }
};

/**
 * Valida una giftcard sin canjearla
 * @param data - Datos para validar la giftcard (code)
 */
export const validateGiftcard = async (
  data: GiftcardValidateRequest,
): Promise<GiftcardValidateResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/giftcards/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid request or gift card code');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const validationResult = await response.json();
    return validationResult;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error validating giftcard:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while validating giftcard');
  }
};
