import { string } from '@tensorflow/tfjs';
import { ReactNode } from 'react';
import { toast,ToastOptions } from 'react-toastify'

type msg = string | ReactNode

export const toasty = {
  success: (msg:msg, options:ToastOptions = {}) => toast.success(msg, options),

  error: (msg:msg, options:ToastOptions = {}) => toast.error(msg, options),

  info: (msg:msg, options:ToastOptions = {}) => toast.info(msg, options),

  warn: (msg:msg, options:ToastOptions = {}) => toast.warn(msg, options),

  custom: (msg:msg, options:ToastOptions = {}) => toast(msg, options),

  emoji: (emoji:string, msg:msg, options:ToastOptions = {}) => toasty.custom(
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 8, fontSize: '1.2em' }}>{emoji}</span>
      <span>{msg}</span>
    </div>,
    options
  ),   
};
