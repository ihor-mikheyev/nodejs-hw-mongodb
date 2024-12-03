import createHttpError from 'http-errors';

import * as authServices from '../services/auth.js';

import { logoutUser } from '../services/auth.js';
import { refreshUsersSession } from '../services/auth.js';
import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/users.js';
import { requestResetToken, resetPassword } from '../services/auth.js';

export const singUpController = async (req, res) => {
  const user = await authServices.singUp(req.body);

  // const { password, ...rest } = user;
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const singInController = async (req, res) => {
  const { _id, accessToken, refreshToken } = await authServices.singIn(
    req.body,
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenLifetime),
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenLifetime),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + accessTokenLifetime),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + accessTokenLifetime),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  const sessionId = req.cookies.sessionId;
  await resetPassword(req.body, sessionId);

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
