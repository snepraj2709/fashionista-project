import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../css/footer.css';

export default function Footer() {
	return (
		<div>
			<div className="footerContainer">
				<TwitterIcon />
				<GitHubIcon />
				<LinkedInIcon />
			</div>

			<p>@No Copyright, Feel free to clone </p>
		</div>
	);
}
