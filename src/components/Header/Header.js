import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grid, Button, Menu, MenuItem } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { setWallet } from '../../redux/actions'
import LogoImage from '../../assets/logo.png'
import './styles.scss'

const Header = () => {
  const dispatch = useDispatch()
  const [anchorEl1, setAnchorEl1] = React.useState(null)
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) dispatch(setWallet(address))
    else dispatch(setWallet(null))
  }, [isConnected])

  const mobileMenuOpen = Boolean(anchorEl1)
  const location = useLocation()

  return (
    <Grid className='navbar'>
      <Container maxWidth='xl'>
        <Grid container className='header' alignItems='center'>
          <Grid xs={4} item>
            <img src={LogoImage} alt='Netro logo' className='site-logo' />
          </Grid>
          <Grid xs={4} sx={{ display: { xs: 'none', sm: 'block' } }} item>
            <Grid container justifyContent={'center'}>
              <Grid className='nav-group'>
                <Link
                  to={'/swap'}
                  className={location.pathname === '/swap' ? 'nav-link active' : 'nav-link'}
                >
                  Swap
                </Link>
                <Link
                  to={'/stats'}
                  className={location.pathname === '/stats' ? 'nav-link active' : 'nav-link'}
                >
                  Stats
                </Link>
                <Link
                  to={'/farm'}
                  className={location.pathname === '/farm' ? 'nav-link active' : 'nav-link'}
                >
                  Farm
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={8} sm={4} item>
            <Grid container justifyContent='flex-end' alignItems={'center'}>
              <ConnectButton />
              <Button id='dropdown'>
                <MenuOutlinedIcon
                  className='mobile-menu'
                  sx={{ display: { xs: 'block', sm: 'none' } }}
                  onClick={(e) => setAnchorEl1(e.target)}
                ></MenuOutlinedIcon>
              </Button>
              <Menu
                id='dropdownMenu'
                anchorEl={anchorEl1}
                open={mobileMenuOpen}
                onClose={() => setAnchorEl1(null)}
                MenuListProps={{
                  'aria-labelledby': 'dropdown',
                }}
              >
                <MenuItem>
                  <Link
                    to={'/swap'}
                    className={location.pathname === '/swap' ? 'nav-link active' : 'nav-link'}
                  >
                    Swap
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to={'/stats'}
                    className={location.pathname === '/stats' ? 'nav-link active' : 'nav-link'}
                  >
                    Stats
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to={'/farm'}
                    className={location.pathname === '/farm' ? 'nav-link active' : 'nav-link'}
                  >
                    Farm
                  </Link>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Header
