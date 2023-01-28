const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    
    let products = [
      {
          name: 'Interlocking G choker',
          category: 'Gucci',
          discription: 'Metal with palladium finish and crystals',
          image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1659457851/659983_92TCG_8563_003_100_0000_Light-GG-small-tote-bag.jpg',
      },
      {
          name: 'Geometric collar',
          category: 'Gucci',
          discription: 'Square blue crystal with Interlocking G',
          image: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1658941269/625774_1W3AN_1000_003_100_0000_Light-GG-embossed-tote-bag.jpg',
      },
      {
          name: 'Angeles choker',
          category: 'Gucci',
          discription: 'Metal with palladium finish and crystals',
          image: 'https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1639386030/691349_J0740_7012_008_100_0000_Light-Rectangular-frame-sunglasses.jpg',
      },
      {
          name: 'Navigator-frame sunglasses',
          category: 'Gucci',
          discription: 'Defined by their bold and unique frame',
          image: 'https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1639419337/691373_J0740_6030_008_100_0000_Light-Navigator-frame-sunglasses.jpg',
      },
      {
          name: 'Interlocking G choker',
          category: 'Gucci',
          discription: 'This choker necklace,is defined by the Interlocking G',
          image: 'https://media.gucci.com/style/HEXEAF2DC_Center_0_0_800x800/1654555548/700094_I4729_8066_003_100_0000_Light-Interlocking-G-choker.jpg',
      },
      {
          name: 'Navigator-frame',
          category: 'Gucci',
          discription: 'This necklace,is defined by the Interlocking G',
          image: 'https://media.gucci.com/style/HEXEAF2DC_Center_0_0_490x490/1654624816/702447_J3F42_8162_003_100_0000_Light-Interlocking-G-crystal-hairslide.jpg',
      },
      {
          name: 'Interlocking G Los Angeles choker',
          category: 'Gucci',
          discription: 'Gold-toned and metal with aged palladium finish',
          image: 'https://media.gucci.com/style/HEXEAF2DC_Center_0_0_2400x2400/1654538414/700778_I5959_8136_003_100_0000_Light-Interlocking-G-Los-Angeles-choker.jpg',
      },
      {
          name: 'Geometric collar with chain fringe',
          category: 'Gucci',
          discription: 'Gold-toned and metal with aged palladium finish',
          image: 'https://media.gucci.com/style/HEXEAF2DC_Center_0_0_490x490/1654555551/700171_I4852_8498_003_100_0000_Light-Geometric-collar-with-chain-fringe.jpg',
      }
  
      
  ]
  
    if(req.session.user){
        res.render('index', { products,user:true});
    }
    else{
        res.redirect('/login')
    }
  
  });
  module.exports = router;