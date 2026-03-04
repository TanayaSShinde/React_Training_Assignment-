import { 
  Container, Typography, Grid, Box, AppBar, Toolbar, Badge, Paper, 
  Button, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DevicesIcon from '@mui/icons-material/Devices';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ProductCard from './ProductCard';
import { useState } from 'react';

// Import images from assets folder
import macbookImg from '../assets/macbook.png';
import dellLaptopImg from '../assets/dell-laptop.png';
import logitechMouseImg from '../assets/logitech-mouse.png';
import gamingMouseImg from '../assets/gaming-mouse.png';
import mousePadImg from '../assets/mouse-pad.png';
import deskPadImg from '../assets/desk-pad.png';
import iphoneImg from '../assets/iphone.png';
import samsungImg from '../assets/samsung.png';
import keyboardImg from '../assets/keyboard.png';
import earbudsImg from '../assets/earbuds.png';

// Product type
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Cart item type
interface CartItem extends Product {
  quantity: number;
}

// Electronic products data
const electronicProducts: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 14" M3 Chip',
    price: 199900,
    image: macbookImg,
  },
  {
    id: 2,
    name: 'Dell XPS 15 Laptop',
    price: 149900,
    image: dellLaptopImg,
  },
  {
    id: 3,
    name: 'Logitech MX Master 3S Mouse',
    price: 9995,
    image: logitechMouseImg,
  },
  {
    id: 4,
    name: 'SteelSeries Gaming Mouse',
    price: 5999,
    image: gamingMouseImg,
  },
  {
    id: 5,
    name: 'RGB Gaming Mouse Pad XL',
    price: 2499,
    image: mousePadImg,
  },
  {
    id: 6,
    name: 'Large Desk Mouse Pad',
    price: 1299,
    image: deskPadImg,
  },
  {
    id: 7,
    name: 'iPhone 18 Pro Max 256GB',
    price: 159900,
    image: iphoneImg,
  },
  {
    id: 8,
    name: 'Samsung Galaxy S24 Ultra',
    price: 134999,
    image: samsungImg,
  },
  {
    id: 9,
    name: 'Mechanical Gaming Keyboard',
    price: 8999,
    image: keyboardImg,
  },
  {
    id: 10,
    name: 'Wireless Earbuds Pro',
    price: 12999,
    image: earbudsImg,
  },
];

const ShoppingPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePayment = () => {
    setPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
    setCartItems([]);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header/Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: '#131921' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            🛒 ShopElectro
          </Typography>
          <Badge badgeContent={getTotalItems()} color="error">
            <ShoppingCartIcon sx={{ fontSize: 30, cursor: 'pointer' }} />
          </Badge>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Left Side - Products (Single Column) */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Section Header */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 4, 
                backgroundColor: 'white',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <DevicesIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                  Electronics
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Discover the latest gadgets and electronics at amazing prices
                </Typography>
              </Box>
            </Paper>

            {/* Products Grid - Single Column */}
            <Grid container spacing={3}>
              {electronicProducts.map((product) => (
                <Grid size={{ xs: 12 }} key={product.id}>
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    onAdd={() => handleAddToCart(product)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Side - Cart */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                position: 'sticky', 
                top: 80,
                borderRadius: 2,
                maxHeight: 'calc(100vh - 120px)',
                overflow: 'auto'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShoppingCartIcon color="primary" />
                Your Cart ({getTotalItems()} items)
              </Typography>
              
              <Divider sx={{ mb: 2 }} />

              {cartItems.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ShoppingCartIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                  <Typography color="text.secondary">
                    Your cart is empty. Add some products!
                  </Typography>
                </Box>
              ) : (
                <>
                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <Box 
                      key={item.id} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        py: 2,
                        borderBottom: '1px solid #eee'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 8 }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Qty: {item.quantity}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </Typography>
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}

                  {/* Total Section */}
                  <Box sx={{ mt: 3, pt: 2, borderTop: '2px solid #1976d2' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">Subtotal:</Typography>
                      <Typography variant="body1">₹{getTotalPrice().toLocaleString('en-IN')}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Total:</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                        ₹{getTotalPrice().toLocaleString('en-IN')}
                      </Typography>
                    </Box>

                    {/* Payment Button */}
                    <Button 
                      variant="contained" 
                      size="large" 
                      fullWidth
                      onClick={handlePayment}
                      sx={{ 
                        py: 1.5, 
                        fontSize: '1.1rem', 
                        fontWeight: 600,
                        backgroundColor: '#1ca906',
                        '&:hover': {
                          backgroundColor: '#1ca906'
                        }
                      }}
                    >
                      Proceed to Payment
                    </Button>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Payment Success Dialog */}
      <Dialog 
        open={paymentDialogOpen} 
        onClose={handleClosePaymentDialog}
        PaperProps={{
          sx: { borderRadius: 3, p: 2 }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Payment Done!
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Your payment has been successfully processed. Thank you for shopping with us!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            variant="contained" 
            onClick={handleClosePaymentDialog}
            sx={{ px: 4 }}
          >
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          backgroundColor: '#131921', 
          color: 'white', 
          py: 3, 
          textAlign: 'center',
          mt: 4
        }}
      >
        <Typography variant="body2">
          © 2026 ShopElectro. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default ShoppingPage;
