// __test__/ProductCard.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/cart/ProductCard';
import { useCartStore } from '@/stores/cart-store';

// Mock the cart store
jest.mock('@/stores/cart-store', () => ({
  useCartStore: jest.fn(),
}));

// Create a mock product
const mockProduct = {
  id: 123,
  name: 'Test Product',
  price: 99.99,
  bsPrice: '99.99',
  refPrice: 25.99,
  description: 'This is a test product description',
  images: ['https://example.com/image.jpg'],
  inventary: { total: 10 },
  taxes: [{ amount: 16 }],
  quantity: 1,
  productId: 123,
  type: 'libre' as const,
  visible: true,
  active: true,
  _id: '123',
  barcode: '123456789',
  betterAttack: [],
  betterIngredients: [],
  category: {
    full_name: 'Test Category',
    name: 'Test',
    slug: 'test',
    editable: '',
    id: 1,
  },
  laboratory: '',
  synons: null,
  activeIngredients: null,
  attack: null,
  templateId: 1,
};

describe('ProductCard', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup default mock implementation
    (useCartStore as jest.Mock).mockReturnValue({
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      isItemInCart: jest.fn().mockReturnValue(false),
      getItemCount: jest.fn().mockReturnValue(0),
    });
  });

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    // Check if product name is displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Check if price is displayed (format may vary based on implementation)
    expect(screen.getByText(/99.99/)).toBeInTheDocument();
  });

  it('shows correct inventory status when product is in stock', () => {
    render(<ProductCard product={mockProduct} />);
    
    // Check if "En stock" text is displayed
    expect(screen.getByText(/En stock/i)).toBeInTheDocument();
  });

  it('shows correct inventory status when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, inventary: { total: 0 } };
    render(<ProductCard product={outOfStockProduct} />);
    
    // Check if "Agotado" text is displayed
    expect(screen.getByText(/Agotado/i)).toBeInTheDocument();
  });

  it('calls addToCart when add button is clicked', () => {
    const mockAddToCart = jest.fn();
    (useCartStore as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
      removeFromCart: jest.fn(),
      isItemInCart: jest.fn().mockReturnValue(false),
      getItemCount: jest.fn().mockReturnValue(0),
    });

    render(<ProductCard product={mockProduct} />);
    
    // Find and click the add to cart button
    const addButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(addButton);
    
    // Verify addToCart was called with correct parameters
    expect(mockAddToCart).toHaveBeenCalledWith({
      userId: expect.any(String),
      products: {
        id: mockProduct.id,
        prescriptionImg: '',
        quantity: 1,
      },
    });
  });

  it('displays quantity controls when product is in cart', () => {
    (useCartStore as jest.Mock).mockReturnValue({
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      isItemInCart: jest.fn().mockReturnValue(true),
      getItemCount: jest.fn().mockReturnValue(2),
      updateQuantity: jest.fn(),
    });

    render(<ProductCard product={mockProduct} />);
    
    // Check if quantity is displayed
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Check if quantity controls are displayed
    expect(screen.getByRole('button', { name: /\+/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /\-/i })).toBeInTheDocument();
  });
});