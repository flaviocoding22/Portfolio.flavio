"""Trecho do núcleo físico de pendulo_v8.py (repositório mechanics-code).

Período exato por média aritmético-geométrica, integrador RK4 e medida do
período na trajetória. Copiado do arquivo original; DT é o passo de integração.
"""
import numpy as np

DT       = 0.016


def _agm(a, b, iters=24):
    """Média aritmético-geométrica de a e b — converge quadraticamente."""
    for _ in range(iters):
        a, b = 0.5 * (a + b), np.sqrt(a * b)
    return a

def exact_period(g, L, theta0):
    """Período exato do pêndulo (sem atrito) para amplitude θ₀ qualquer.

    T = 4√(L/g)·K(sin(θ₀/2)), e K(k) = π / (2·AGM(1, cos(θ₀/2))), logo
    T = 2π√(L/g) / AGM(1, cos(θ₀/2)). Para θ₀ → 0 recai em 2π√(L/g).
    """
    return 2 * np.pi * np.sqrt(L / g) / _agm(1.0, np.cos(theta0 / 2.0))

def _rk4(deriv, theta0, t):
    """Integra θ'' = deriv(t, θ, ω) (na forma de 1ª ordem) por RK4, com θ(0)=θ0,
    ω(0)=0. O tempo é passado a deriv por causa do termo forçante cos(ω_d·t).
    Retorna (theta, omega)."""
    Ns = len(t); th = np.zeros(Ns); om = np.zeros(Ns); th[0] = theta0
    for i in range(1, Ns):
        ti = t[i-1]
        k1 = deriv(ti,        th[i-1],            om[i-1])
        k2 = deriv(ti+DT/2,   th[i-1]+DT/2*k1[0], om[i-1]+DT/2*k1[1])
        k3 = deriv(ti+DT/2,   th[i-1]+DT/2*k2[0], om[i-1]+DT/2*k2[1])
        k4 = deriv(ti+DT,     th[i-1]+DT  *k3[0], om[i-1]+DT  *k3[1])
        th[i] = th[i-1] + DT/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0])
        om[i] = om[i-1] + DT/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1])
    return th, om

def measured_period(t, th):
    """Mede o período direto da trajetória: como θ(0)=θ₀ é um máximo, o
    primeiro máximo interior de θ acontece após uma oscilação completa.
    Retorna None se não houver oscilação (caso super-amortecido)."""
    for i in range(1, len(th) - 1):
        if th[i] > th[i-1] and th[i] >= th[i+1] and th[i] > 0.0:
            return float(t[i])
    return None

