import { Card, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  onAdd?: () => void;
}

const ProductCard = ({ image, name, price, onAdd }: ProductCardProps) => {
  return (
    <Card 
      sx={{ 
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        }
      }}
    >
      {/* Product Image on Left */}
      <Box
        sx={{
          width: 120,
          height: 120,
          flexShrink: 0,
          backgroundColor: '#f8f9fa',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Product Details on Right */}
      <Box sx={{ flexGrow: 1, ml: 3 }}>
        <Typography 
          variant="h6" 
          component="h3"
          sx={{ 
            fontWeight: 600,
            fontSize: '1.1rem',
            marginBottom: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {name}
        </Typography>
        <Typography 
          variant="h5" 
          color="primary"
          sx={{ 
            fontWeight: 700,
            fontSize: '1.4rem',
          }}
        >
          ₹{price.toLocaleString('en-IN')}
        </Typography>
      </Box>

      {/* Add Button on Right Side */}
      <IconButton
        onClick={onAdd}
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          ml: 2,
          '&:hover': {
            backgroundColor: '#1565c0',
            transform: 'scale(1.1)',
          }
        }}
        size="medium"
        aria-label="add to cart"
      >
        <AddIcon />
      </IconButton>
    </Card>
  );
};

export default ProductCard;
