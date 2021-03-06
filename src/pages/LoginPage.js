import React, { useContext } from 'react';
import Grid from '../components/layout/Grid';
import Swal from 'sweetalert2';
import '../auth.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { useForm } from '../hooks/useForm';

function LoginPage() {
	const { signin } = useContext(AuthContext);

	const [form, handleFormChange] = useForm({
		email: '',
		password: '',
	});

	const { email, password } = form;

	const handleSignin = async (e) => {
		e.preventDefault();

		if (!email.trim() || !password.trim()) {
			return;
		}

		const { success, msg } = await signin(email, password);
		if (!success) {
			return Swal.fire(
				'Error',
				msg || 'Error al crear cuenta. Por favor intente más tarde',
				'error'
			);
		}
	};

	return (
		<div className="auth__page">
			<div className="auth__form-wrapper">
				<form
					action="/signin"
					method="POST"
					className="auth__form"
					autoComplete="off"
					onSubmit={handleSignin}
				>
					<h1 className="text-center">Welcome Back</h1>
					<div className="mb-3">
						<label className="form-label" htmlFor="email">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							required
							value={email}
							onChange={handleFormChange}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							required
							value={password}
							onChange={handleFormChange}
						/>
					</div>
					<Grid>
						<button
							type="submit"
							className="btn btn--primary mt-2 col--12"
						>
							Sign In
						</button>
					</Grid>
					<p className="auth__bottom-text">
						Don't have an account?
						<Link to="/signup">Create one for free</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
