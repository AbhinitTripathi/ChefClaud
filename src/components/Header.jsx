import chefIcon from '../assets/chef.png';
export default function Header() {
    return(
        <header>
            <img src={chefIcon} alt="chef icon" />
            <h1>Chef Claude</h1>
        </header>
    )
}