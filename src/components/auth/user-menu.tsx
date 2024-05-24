"use client";

import { logoutAction } from "@/auth/auth-actions";
import {
    Avatar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import CoreIcon from "../core/core-icon";
import LoadingTopbar from "../progress-bar/loading-topbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-provider";

// -----------------------------------------------------------
interface Props {}

const UserMenu: React.FC<Props> = () => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const { session } = useAuth();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutMutation = useMutation({
        mutationFn: async () => {
            return await logoutAction();
        },
        onSuccess: () => {
            toast.success("Logged out successfully");
            handleClose();
        },
        onError: () => {
            toast.error("Failed to log out");
        },
    });

    return (
        <React.Fragment>
            {logoutMutation.isLoading && <LoadingTopbar />}
            <Tooltip title="User menu">
                <IconButton
                    onClick={handleClick}
                    aria-controls={open ? "user-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <CoreIcon.User size={24} />
                </IconButton>
            </Tooltip>
            <Menu
                id="user-menu"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                disableScrollLock
            >
                {session ? (
                    <div>
                        <MenuItem onClick={handleClose}>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />

                        <MenuItem onClick={() => logoutMutation.mutate()}>
                            <ListItemIcon>
                                <CoreIcon.SignOut fontSize={24} />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </div>
                ) : (
                    <div>
                        <MenuItem onClick={() => router.push("/login")}>
                            <ListItemIcon>
                                <CoreIcon.SignIn fontSize={24} />
                            </ListItemIcon>
                            Login
                        </MenuItem>
                        <MenuItem onClick={() => router.push("/register")}>
                            <ListItemIcon>
                                <CoreIcon.UserPlus fontSize={24} />
                            </ListItemIcon>
                            Register
                        </MenuItem>
                    </div>
                )}
            </Menu>
        </React.Fragment>
    );
};

export default UserMenu;
