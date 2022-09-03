# Remove Format buttons from Gutenberg toolbar for Core blocks  
  

## Process  
Works for simple formats without any popup  
1- `unregisterFormatType` for all RichText component based blocks  
2- `registerFormatType` conditionally for specific blocks

