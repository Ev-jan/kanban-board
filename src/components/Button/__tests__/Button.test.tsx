import { render, screen, fireEvent } from '@testing-library/react';
import Button from './../Button';

    it('renders with correct text and is enabled when inputValue is not empty and isInputHidden is not hidden', () => {
        const handleButtonClick = jest.fn();
        const inputValue = 'Task name';
        const isInputHidden = false;

        render(
            <Button
                handleButtonClick={handleButtonClick}
                inputValue={inputValue}
                isInputHidden={isInputHidden}
            />
        );
        const buttonText = screen.getByText('Submit');
        expect(buttonText).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).toBeEnabled();

        fireEvent.click(button);
        expect(handleButtonClick).toHaveBeenCalledTimes(1);
    });

    it('renders with correct text and is disabled when inputValue is empty and isInputHidden is false', () => {
        const handleButtonClick = jest.fn();
        const inputValue = '';
        const isInputHidden = false;

        render(
            <Button
                handleButtonClick={handleButtonClick}
                inputValue={inputValue}
                isInputHidden={isInputHidden}
            />
        );

        const buttonText = screen.getByText('Add card');
        expect(buttonText).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();

        fireEvent.click(button);

        expect(handleButtonClick).not.toHaveBeenCalled();
    });