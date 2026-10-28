"""[EXEMPLO] Viga em balanço (Euler-Bernoulli): deflexão, tensão e 1a frequência natural."""
import numpy as np

# Dados fictícios (aço, seção retangular)
L = 0.200          # comprimento [m]
b, h = 0.010, 0.020  # largura e altura da seção [m]
E = 210e9          # módulo de Young [Pa]
rho = 7850.0       # densidade [kg/m^3]
P = 100.0          # carga na ponta [N]

I = b * h**3 / 12  # momento de inércia [m^4]
A = b * h          # área [m^2]


def deflexao(x, P, L, E, I):
    """Deflexão w(x) de viga engastada com carga P na ponta."""
    return P * x**2 * (3 * L - x) / (6 * E * I)


def tensao_max(P, L, h, I):
    """Tensão normal máxima no engaste: sigma = M c / I."""
    return P * L * (h / 2) / I


def freq_natural(L, E, I, rho, A, modo=1):
    """Frequência natural [Hz] dos primeiros modos de flexão."""
    beta_L = [1.8751, 4.6941, 7.8548][modo - 1]
    return beta_L**2 / (2 * np.pi * L**2) * np.sqrt(E * I / (rho * A))


if __name__ == "__main__":
    x = np.linspace(0, L, 5)
    print("x [mm]  w [mm]")
    for xi, wi in zip(x, deflexao(x, P, L, E, I)):
        print(f"{xi * 1e3:6.1f}  {wi * 1e3:8.4f}")
    print(f"Tensão máx: {tensao_max(P, L, h, I) / 1e6:.1f} MPa")
    print(f"f1 = {freq_natural(L, E, I, rho, A):.1f} Hz")
