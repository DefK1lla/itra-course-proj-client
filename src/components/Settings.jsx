import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { Menu, MenuItem, Button, Fade, FormControl, InputLabel, Select } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import SettingsState from '../store/SettingsState';

const Settings = () => {
    const intl = useIntl();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (event) => {
        SettingsState.setLocale(event.target.value);
    };

    const handleThemeChange = (event) => {
        SettingsState.setMode(event.target.value);
    };

    return (
        <div>
            <Button
                color="inherit"
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                title={intl.formatMessage({ id: 'settings.title' })}
            >
                <MoreVertIcon />
            </Button>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">
                            <FormattedMessage id='settings.lang' />
                        </InputLabel>

                        <FormattedMessage id='settings.lang'>
                            {(msg) => (
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={SettingsState.locale}
                                    label={msg[0]}
                                    onChange={handleLanguageChange}
                                >
                                    <MenuItem value='ru'>RU</MenuItem>
                                    <MenuItem value='en'>EN</MenuItem>
                                </Select>
                            )}
                        </FormattedMessage>
                    </FormControl>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">
                            <FormattedMessage id='settings.mode' />
                        </InputLabel>

                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={SettingsState.mode}
                            label="Theme"
                            onChange={handleThemeChange}
                        >
                            <MenuItem value='light'>
                                <FormattedMessage id='settings.mode.light' />
                            </MenuItem>

                            <MenuItem value='dark'>
                                <FormattedMessage id='settings.mode.dark' />
                            </MenuItem>
                        </Select>
                    </FormControl>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Settings;