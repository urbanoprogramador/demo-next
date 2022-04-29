import { AppBar,  IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
export const Header: React.FC = () => {
    return (<>
        <AppBar position="static" >
            <Toolbar sx={{paddingY:2,display:'flex',justifyContent:"center"}}>
                 <IconButton
                    size="medium"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr:2, paddingX:2,paddingY:1,borderRadius:'50%',border:'solid 1px black' }}
                >
                    B
                </IconButton>
                <Typography variant="h6" component="div" >
                    Colegio Brillamont
                </Typography>
                
            </Toolbar>
        </AppBar>
    </>);
}