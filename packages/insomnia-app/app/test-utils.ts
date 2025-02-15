import * as modals from './ui/components/modals';
import type { ErrorModalOptions } from './ui/components/modals/error-modal';

export const getAndClearShowPromptMockArgs = () => {
  const mockFn = modals.showPrompt as jest.Mock;
  const { title, submitName, defaultValue, onComplete } = mockFn.mock.calls[0][0];
  mockFn.mockClear();
  return {
    title,
    submitName,
    defaultValue,
    onComplete,
  };
};

export const getAndClearShowAlertMockArgs = () => {
  const mockFn = modals.showAlert as jest.Mock;
  const { title, okLabel, addCancel, message, onConfirm } = mockFn.mock.calls[0][0];
  mockFn.mockClear();
  return {
    title,
    okLabel,
    addCancel,
    message,
    onConfirm,
  };
};

export const getAndClearShowErrorMockArgs = (): ErrorModalOptions => {
  const mockFn = modals.showError as jest.Mock;
  const options: ErrorModalOptions = mockFn.mock.calls[0][0];
  mockFn.mockClear();
  return options;
};

export const getAndClearShowModalMockArgs = () => {
  const mockFn = modals.showModal as jest.Mock;
  const args = mockFn.mock.calls[0][1];
  mockFn.mockClear();
  return args;
};
